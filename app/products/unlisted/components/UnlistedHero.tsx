'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { TrendingUp, ShoppingCart, HandCoins, Activity, 
    Newspaper, CheckCircle, ShieldCheck, ArrowLeft,
    Send, X, User, Loader2
} from 'lucide-react';
import { createEnquiry } from '../../../services/unlistedservices';
import { useModal } from '../../../context/ModalContext';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

// Define Enquiry type matching the service
interface EnquiryPayload {
    company_id?: number;
    enquiry_type: 'buy' | 'sell' | 'other';
    full_name: string;
    email: string;
    phone: string;
    quantity?: number;
    message?: string;
}

interface UnlistedHeroProps {
    onActionClick?: () => void;
    onApplyClick?: () => void;
}

export default function UnlistedHero({ onActionClick, onApplyClick }: UnlistedHeroProps) {
    const router = useRouter();
    const { openLogin } = useModal();
    const handleBackHome = () => router.push('/');
    
    const handleApplyNow = () => {
        openLogin();
    };

    const [showTabs, setShowTabs] = useState(false);
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

    useEffect(() => {
        const hasVisitedUnlisted = localStorage.getItem("unlistedHeroVisited");
        
        if (hasVisitedUnlisted) {
            setShowTabs(true);
            return;
        }

        const timer = setTimeout(() => {
            setShowTabs(true);
            // localStorage.setItem("unlistedHeroVisited", "true");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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
            // Create payload matching the service's expected type
            const payload: EnquiryPayload = {
                enquiry_type: 'buy',
                full_name: formData.fullName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
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
            toast.error('Enquiry error:');
            const errorMessage = err.response?.data?.message || err.message || 'Failed to submit enquiry. Please try again.';
            setEnquiryError(errorMessage);
            showNotification(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col bg-white overflow-hidden pt-12">
            
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

            <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
                {/* Mobile: icon only */}
                <button
                    onClick={handleBackHome}
                    aria-label="Back to Home"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                        <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    </div>
                </button>
                {/* Desktop: full text button */}
                <button
                    onClick={handleBackHome}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>
            </div>
            {/* Main Hero Content */}
            <div className="max-w-[1440px] mx-auto px-6 w-full flex-grow flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2076C7] mt-10 md:mt-0">
                            <TrendingUp size={14} />
                            India&apos;s Premier Pre-IPO Platform
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent">
                            Invest in the Next <br />
                            Tech Unicorns
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-xl font-medium">
                            Access exclusive unlisted shares and Pre-IPO opportunities before they hit the stock exchange.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4 items-center">
                            <button
                                onClick={handleApplyNow}
                                className="group relative text-white px-10 py-5 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer" 
                                style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1">
                                    Apply Now
                                </span>
                                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                            </button>

                            <button
                                onClick={() => setShowEnquiryModal(true)}
                                className="group relative bg-white px-10 py-5 rounded-2xl font-black text-base border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer overflow-hidden"
                                style={{ color: '#2076C7', borderColor: '#2076C7' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Send size={20} strokeWidth={2.5} />
                                    Enquire Now
                                </span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Side Image */}
                    <div className="relative flex justify-center">
                        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2076C7]/15 to-[#1CADA3]/15 blur-3xl" />
                            
                            <motion.div 
                                animate={{ scale: [1, 1.03, 1] }} 
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] bg-white rounded-full shadow-[0_20px_60px_-15px_rgba(32,118,199,0.3)] border-8 border-white overflow-hidden"
                            >
                            <Image
                                src="/unlistedshares/unlisted_shares.png"
                                alt="Hero"
                                width={450}
                                height={450}
                                className="w-full h-full object-cover rounded-full"
                            />
                            </motion.div>
                            
                            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 right-0 md:right-4 bg-white p-4 rounded-2xl shadow-2xl border border-blue-50 flex items-center gap-3 z-20">
                                <div className="w-10 h-10 bg-[#1CADA3] rounded-xl flex items-center justify-center text-white shadow-lg"><CheckCircle size={22} strokeWidth={2.5} /></div>
                                <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Users</p><p className="text-lg font-black text-slate-800 leading-none">15,000+</p></div>
                            </motion.div>

                            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-10 left-0 md:-left-4 bg-white p-4 rounded-2xl shadow-2xl border border-blue-50 flex items-center gap-3 z-20">
                                <div className="w-10 h-10 bg-[#2076C7] rounded-xl flex items-center justify-center text-white shadow-lg"><ShieldCheck size={22} strokeWidth={2.5} /></div>
                                <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Safety</p><p className="text-lg font-black text-slate-800 leading-none">Verified</p></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="w-full pb-16 pt-10 border-b border-gray-50">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className={`flex flex-wrap justify-center items-center gap-4 lg:gap-8 transition-opacity duration-1000 delay-300 ${showTabs ? 'opacity-100' : 'opacity-0'}`}>
                        {[
                            { href: '/products/unlisted/buy-shares', icon: ShoppingCart, label: 'Buy Shares' },
                            { href: '/products/unlisted/sell-shares', icon: HandCoins, label: 'Sell Shares' },
                            { href: '/products/unlisted/live-trends', icon: Activity, label: 'Live Trends' },
                            { href: '/products/unlisted/presspage', icon: Newspaper, label: 'Press & Media' },
                        ].map(({ href, icon: Icon, label }) => (
                            <Link key={href} href={href} className="min-w-[160px] sm:min-w-[220px] px-6 py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all flex items-center justify-center gap-3 text-sm sm:text-base cursor-pointer">
                                <Icon size={20} strokeWidth={2.5} /> {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enquiry Modal - Compact Size */}
{/* Enquiry Modal - Updated for API: full_name, email, phone, message */}
            {showEnquiryModal && (
                <div className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-4 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-black uppercase tracking-tight">Investor Enquiry</h3>
                                <p className="text-xs text-white/80">Fill details to get started</p>
                            </div>
                            <button onClick={() => setShowEnquiryModal(false)} className="hover:bg-white/20 p-1 rounded-full transition-all">
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
                                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black" 
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
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black" 
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
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black" 
                                        placeholder="8421736838" 
                                    />
                                </div>
                            </div>
                            
                            {/* Message */}
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-1 tracking-widest">
                                    Message <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <textarea 
                                        onChange={(e) => handleInputChange('message', e.target.value)} 
                                        required 
                                        rows={3}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#2076C7] text-sm text-black resize-none" 
                                        placeholder="Enter your enquiry details here..." 
                                    />
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold text-base hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" />Processing...</>
                                ) : (
                                    <><Send className="w-4 h-4" />Submit Enquiry</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-[7000] bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">Enquiry Sent!</h3>
                        <p className="text-gray-500 text-sm mb-4">Our manager will contact you within 24 hours.</p>
                        <button 
                            onClick={() => setShowSuccess(false)} 
                            className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}