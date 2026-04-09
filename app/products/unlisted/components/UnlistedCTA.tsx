'use client';

import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useModal } from '../../../context/ModalContext';
import { createEnquiry } from '../../../services/unlistedservices';
import { 
    Send, 
    X, 
    User, 
    Loader2, 
    Building,
    Calculator,
    CheckCircle 
} from 'lucide-react';

// Define Enquiry type for API calls
interface EnquiryPayload {
    company_id?: number;
    enquiry_type: 'buy' | 'sell';
    full_name: string;
    email: string;
    phone: string;
    quantity?: number;
    message?: string;
}

export default function UnlistedCTA() {
    const { openPartner } = useModal();
    
    // Enquiry Modal States
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [enquiryError, setEnquiryError] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<{ id: number; message: string; type?: 'success' | 'error' }[]>([]);

    // Form Data - All required fields
    const [formData, setFormData] = useState({
        companyId: '',
        fullName: '',
        email: '',
        phone: '',
        quantity: ''
    });

    // NOTIFICATION HANDLER
    const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (enquiryError) setEnquiryError(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate all required fields
        if (!formData.companyId.trim()) {
            setEnquiryError('Company ID is required');
            return;
        }
        if (!formData.fullName.trim()) {
            setEnquiryError('Full name is required');
            return;
        }
        if (!formData.email.trim()) {
            setEnquiryError('Email is required');
            return;
        }
        if (!formData.phone.trim()) {
            setEnquiryError('Phone number is required');
            return;
        }
        if (!formData.quantity.trim()) {
            setEnquiryError('Quantity is required');
            return;
        }
        
        // Validate company ID
        const companyIdNum = parseInt(formData.companyId);
        if (isNaN(companyIdNum) || companyIdNum <= 0) {
            setEnquiryError('Please enter a valid company ID');
            return;
        }
        
        // Validate quantity
        const quantityNum = parseInt(formData.quantity);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            setEnquiryError('Please enter a valid quantity');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setEnquiryError('Please enter a valid email address');
            return;
        }
        
        // Validate phone (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
            setEnquiryError('Please enter a valid 10-digit phone number');
            return;
        }

        setIsSubmitting(true);
        setEnquiryError(null);
        
        try {
            const payload: EnquiryPayload = {
                company_id: companyIdNum,
                enquiry_type: 'buy',
                full_name: formData.fullName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                quantity: quantityNum,
                message: `Enquiry for company ID ${companyIdNum} - ${quantityNum} shares`
            };

            await createEnquiry(payload);
            
            setShowEnquiryModal(false);
            setShowSuccess(true);
            setFormData({
                companyId: '',
                fullName: '',
                email: '',
                phone: '',
                quantity: ''
            });
            
            showNotification('Enquiry submitted successfully!', 'success');
            
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to submit enquiry. Please try again.';
            setEnquiryError(errorMessage);
            showNotification(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Notifications */}
            <div className="fixed top-20 right-5 z-[5000] flex flex-col gap-3">
                {notifications.map(n => (
                    <div 
                        key={n.id} 
                        className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right-5 ${
                            n.type === 'error' 
                                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                    >
                        {n.type === 'error' ? (
                            <X className="w-4 h-4 text-rose-600" />
                        ) : (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                        <span className="text-sm font-medium">{n.message}</span>
                    </div>
                ))}
            </div>

            {/* ── CTA Banner ─────────────────────────────────────────────── */}
            <section className="bg-linear-to-r from-teal-600 to-teal-500 text-white py-16 font-sans">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[1440px] mx-auto space-y-8"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-8 bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent tracking-tight leading-tight">
                            Ready to Start Your <br className="hidden md:block" />Unlisted Shares Journey?
                        </h2>
                        <p className="text-white/80 font-bold text-lg max-w-3xl mx-auto leading-relaxed">
                            Create your free account today and unlock exclusive access to high-growth Pre-IPO opportunities before they hit the market.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {/* Create Free Account Button - Opens Partner Modal */}
                            <button
                                onClick={openPartner}
                                className="group flex items-center justify-center gap-3 px-10 py-4 bg-white text-teal-600 rounded-xl font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
                            >
                                Create Free Account
                                <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            {/* Enquire Now Button - Opens Enquiry Modal */}
                            <button
                                onClick={() => setShowEnquiryModal(true)}
                                className="flex items-center justify-center gap-1 px-10 py-4 border-2 border-white/40 text-white rounded-xl font-extrabold text-base hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                            >
                                Enquire Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ENQUIRY MODAL - Compact with all required fields */}
            {showEnquiryModal && (
                <div className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-black uppercase tracking-tight">Investor Enquiry</h3>
                                <p className="text-xs text-white/80">Fill details to get started</p>
                            </div>
                            <button 
                                onClick={() => setShowEnquiryModal(false)} 
                                className="hover:bg-white/20 p-1 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form className="p-5 space-y-4" onSubmit={handleFormSubmit}>
                            {enquiryError && (
                                <div className="bg-rose-50 text-rose-600 text-xs p-2 rounded-lg border border-rose-200 flex items-start gap-2">
                                    <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                    <span>{enquiryError}</span>
                                </div>
                            )}
                            
                            {/* Company ID */}
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                    Company ID <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input 
                                        type="number"
                                        value={formData.companyId}
                                        onChange={(e) => handleInputChange('companyId', e.target.value)}
                                        required 
                                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-teal-500 text-sm text-black" 
                                        placeholder="Enter company ID" 
                                        min="1"
                                    />
                                </div>
                            </div>
                            
                            {/* Full Name */}
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input 
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        required 
                                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-teal-500 text-sm text-black" 
                                        placeholder="John Doe" 
                                    />
                                </div>
                            </div>
                            
                            {/* Email and Phone - Side by side */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                        Email <span className="text-rose-500">*</span>
                                    </label>
                                    <input 
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required 
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-teal-500 text-sm text-black" 
                                        placeholder="john@email.com" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                        Phone <span className="text-rose-500">*</span>
                                    </label>
                                    <input 
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        required 
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-teal-500 text-sm text-black" 
                                        placeholder="9876543210" 
                                    />
                                </div>
                            </div>
                            
                            {/* Quantity */}
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                    Quantity (Shares) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input 
                                        type="number"
                                        value={formData.quantity}
                                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                                        required 
                                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-teal-500 text-sm text-black" 
                                        placeholder="Number of shares" 
                                        min="1"
                                    />
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg font-bold text-base hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Submit Enquiry
                                    </>
                                )}
                            </button>
                            
                            {/* Trust message */}
                            <p className="text-[10px] text-gray-400 text-center pt-1">
                                ✓ Your information is secure and will not be shared
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* SUCCESS MODAL */}
            {showSuccess && (
                <div className="fixed inset-0 z-[7000] bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Enquiry Sent!</h3>
                        <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                            Our relationship manager will contact you within 24 hours with more information.
                        </p>
                        <button 
                            onClick={() => setShowSuccess(false)} 
                            className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg font-bold hover:opacity-90 transition-all"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}