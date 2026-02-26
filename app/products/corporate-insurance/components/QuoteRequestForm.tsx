"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, Loader2, Send, FileText, Phone, Mail, User, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialProduct?: string;
}

export default function QuoteRequestForm({ isOpen, onClose, initialProduct }: QuoteRequestFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        companyName: "",
        product: initialProduct || "General Inquiry",
        requirements: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset form when opened with new product
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({ ...prev, product: initialProduct || prev.product }));
            setIsSuccess(false);
        }
    }, [isOpen, initialProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Quote Request Submitted:", formData);

        setIsSubmitting(false);
        setIsSuccess(true);

        // Close modal after success (optional delay)
        // setTimeout(onClose, 3000); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Request Customized Quote
                        </h2>
                        <p className="text-blue-50 text-sm mt-1">Get the best rates from top insurers.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Request Received!</h3>
                                <p className="text-slate-600 mb-6">
                                    Thank you, <span className="font-semibold">{formData.name}</span>. <br />
                                    Our expert advisor will contact you shortly on <b>{formData.mobile}</b>.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-slate-100 font-semibold text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    Close
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                {/* Name Loop */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                        <User className="w-3 h-3" /> Full Name
                                    </label>
                                    <input
                                        name="name" type="text" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full p-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                            <Phone className="w-3 h-3" /> Mobile
                                        </label>
                                        <input
                                            name="mobile" type="tel" required
                                            value={formData.mobile} onChange={handleChange}
                                            className="w-full p-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none transition-all"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> Email
                                        </label>
                                        <input
                                            name="email" type="email" required
                                            value={formData.email} onChange={handleChange}
                                            className="w-full p-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none transition-all"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" /> Company / Organization
                                    </label>
                                    <input
                                        name="companyName" type="text"
                                        value={formData.companyName} onChange={handleChange}
                                        className="w-full p-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none transition-all"
                                        placeholder="Acme Corp Pvt Ltd (Optional)"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Product Interest</label>
                                    <select
                                        name="product"
                                        value={formData.product} onChange={handleChange}
                                        className="w-full p-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none transition-all"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Corporate Insurance">Corporate Insurance</option>
                                        <option value="Group Health Insurance">Group Health Insurance</option>
                                        <option value="Cyber Insurance">Cyber Insurance</option>
                                        <option value="Fire & Burglary">Fire & Burglary</option>
                                        <option value="Liability Insurance">Liability Insurance</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Specific Requirements</label>
                                    <textarea
                                        name="requirements"
                                        value={formData.requirements} onChange={handleChange}
                                        className="w-full p-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#2076C7] outline-none transition-all resize-none h-24"
                                        placeholder="Describe your needs (e.g. Number of employees, coverage amount...)"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-[#2076C7] hover:bg-[#1862A8] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin w-5 h-5" /> Processing...
                                        </>
                                    ) : (
                                        <>
                                            Request Free Quote <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-[10px] text-center text-slate-400">
                                    By submitting, you authorize Infinity to contact you via call/SMS/WhatsApp.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
