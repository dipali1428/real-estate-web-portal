'use client';
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, X, Loader2, ShoppingBag, IndianRupee } from 'lucide-react';
import customerService from '../../services/customerService';
import toast from 'react-hot-toast';

export type ProductType = 'SHARE' | 'MUTUAL_FUND' | 'BOND' | 'NCD' | 'PMS' | 'AIF' | 'NPS' | 'Real_Estate' | 'FIXED_DEPOSIT';

interface EnquiryPayload {
    full_name: string;
    email: string;
    phone: string;
    city: string;
    message: string;
    product_type: ProductType;
    product_name: string;
    product_id: number;
    quantity?: number;
    price?: string;
    source_page?: string;
    platform?: string;
}

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    productType: ProductType;
    productName?: string;
    productId?: number;
    sourcePage?: string;
    preFillMessage?: string;
    multipleProducts?: Array<{ id: number; name: string; quantity?: number; price?: string }>;
}

const DEFAULT_MULTIPLE_PRODUCTS: Array<{ id: number; name: string; quantity?: number; price?: string }> = [];

const EnquiryModal: React.FC<EnquiryModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    productType,
    productName = '',
    productId = 0,
    sourcePage = typeof window !== 'undefined' ? window.location.pathname : '',
    preFillMessage = '',
    multipleProducts = DEFAULT_MULTIPLE_PRODUCTS
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [enquiryError, setEnquiryError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    });

    const getProductTypeLabel = (type: ProductType): string => {
        const types: Record<ProductType, string> = {
            'SHARE': 'Unlisted Share',
            'MUTUAL_FUND': 'Mutual Fund',
            'BOND': 'Bonds',
            'NCD': 'Non-Convertible Debenture',
            'PMS': 'Portfolio Management Services',
            'AIF': 'Alternative Investment Fund',
            'NPS': 'National Pension System',
            'Real_Estate': 'Real Estate',
            'FIXED_DEPOSIT': 'Fixed Deposit',
        };
        return types[type] || type;
    };

    const getTotalAmount = () => {
        if (multipleProducts.length > 0) {
            return multipleProducts.reduce((total, item) => {
                return total + (parseFloat(item.price || '0') * (item.quantity || 1));
            }, 0);
        }
        return parseFloat(productName) || 0;
    };

    const multipleProductsSerialized = JSON.stringify(multipleProducts);

    // Generate default message based on cart items
    useEffect(() => {
        if (preFillMessage) {
            setFormData(prev => ({ ...prev, message: preFillMessage }));
        }
    }, [preFillMessage]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (enquiryError) setEnquiryError(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.full_name.trim()) {
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
        if (!formData.city.trim()) {
            setEnquiryError('City is required');
            return;
        }
        if (!formData.message.trim()) {
            setEnquiryError('Message is required');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setEnquiryError('Please enter a valid email address');
            return;
        }
        
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
            setEnquiryError('Please enter a valid 10-digit phone number');
            return;
        }

        setIsSubmitting(true);
        setEnquiryError(null);
        
        try {
            // Submit enquiry for each product in cart
            if (multipleProducts.length > 0) {
                for (const product of multipleProducts) {
                    const payload: EnquiryPayload = {
                        full_name: formData.full_name.trim(),
                        email: formData.email.trim(),
                        phone: formData.phone.trim(),
                        city: formData.city.trim(),
                        message: formData.message.trim(),
                        product_type: productType,
                        product_name: product.name,
                        product_id: product.id,
                        quantity: product.quantity || 1,
                        price: product.price,
                        source_page: sourcePage,
                        platform: 'WEB'
                    };
                    await customerService.submitEnquiry(payload);
                }
                toast.success(`Enquiry submitted for ${multipleProducts.length} product(s)!`);
            } else if (productName && productId) {
                const payload: EnquiryPayload = {
                    full_name: formData.full_name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    city: formData.city.trim(),
                    message: formData.message.trim(),
                    product_type: productType,
                    product_name: productName,
                    product_id: productId,
                    quantity: 1,
                    source_page: sourcePage,
                    platform: 'WEB'
                };
                await customerService.submitEnquiry(payload);
                toast.success('Enquiry submitted successfully!');
            } else {
                setEnquiryError('No products selected');
                setIsSubmitting(false);
                return;
            }
            
            if (onSuccess) onSuccess();
            onClose();
            
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to submit enquiry. Please try again.';
            setEnquiryError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-8">
                <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-5 text-white flex justify-between items-center sticky top-0">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight">
                            {getProductTypeLabel(productType)} Enquiry
                        </h3>
                        <p className="text-sm text-white/80">Complete your investment request</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="hover:bg-white/20 p-2 rounded-full transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form className="p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto" onSubmit={handleFormSubmit}>
                    {enquiryError && (
                        <div className="bg-rose-50 text-rose-600 text-sm p-3 rounded-lg border border-rose-200 flex items-start gap-2">
                            <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{enquiryError}</span>
                        </div>
                    )}
                    
                    
                    {/* Personal Details Section - Only this is editable */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h4 className="text-sm font-black text-gray-700 mb-3 flex items-center gap-2">
                            <User className="w-4 h-4 text-[#2076C7]" />
                            Personal Information
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input 
                                        value={formData.full_name}
                                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                                        required 
                                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black" 
                                        placeholder="Your full name" 
                                    />
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                        Email <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                        <input 
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required 
                                            className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black" 
                                            placeholder="your@email.com" 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                        Phone <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                        <input 
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            required 
                                            className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black" 
                                            placeholder="9876543210" 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                    City <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input 
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        required 
                                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black" 
                                        placeholder="Your city" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Message Section */}
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                            Your Message <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                            <textarea 
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                required 
                                rows={5}
                                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black resize-none" 
                                placeholder="Enter any specific requirements or questions here..."
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting || (multipleProducts.length === 0 && !productName)} 
                        className="w-full py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-base hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting Enquiry...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Submit Investment Request
                            </>
                        )}
                    </button>
                    
                    <p className="text-xs text-gray-400 text-center pt-2 flex items-center justify-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Your information is secure
                        <CheckCircle className="w-3 h-3" />
                        Our RM will contact you within 24 hours
                    </p>
                </form>
            </div>
        </div>
    );
};

export default EnquiryModal;