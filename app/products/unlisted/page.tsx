'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from "../../context/ModalContext"; 
import { CheckCircle } from 'lucide-react';
import { fetchAllShares } from '../../services/unlistedservices';

// Components
import UnlistedHero from './components/UnlistedHero';
import FeaturedCompanies from './components/FeaturedCompanies';
import InvestmentProcess from './components/InvestmentProcess';
import UnlistedBenefits from './components/UnlistedBenefits';
import FAQSection from './components/UnlistedFAQ';
import UnlistedCTA from './components/UnlistedCTA';
import ScrollToTop from '../../component/ScrollToTop';
import { toast } from 'react-hot-toast';

interface Company {
    id: number;
    name: string;
    sector: string;
    price: number;
    min_lot_size: number;
    logo_url?: string;
    depository_applicable?: string;
}

export default function UnlistedHomePage() {
    const { openPartner, openLogin } = useModal();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [enquiryCompany, setEnquiryCompany] = useState<Company | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [enquiryError, setEnquiryError] = useState<string | null>(null);
    const [formData, setFormData] = useState({ 
        fullName: '', 
        email: '', 
        phone: '', 
        city: '', 
        message: '' 
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetchAllShares();
                const data = Array.isArray(res) ? res : res?.data || res?.shares || [];
                setCompanies(data);
            } catch (err) { 
                toast.error('Error fetching companies:'); 
            } finally { 
                setLoading(false); 
            }
        };
        loadData();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#b5d9f3] via-white to-[#ecf5ec] text-slate-800 font-sans scroll-smooth">
            <UnlistedHero 
                onActionClick={openPartner} 
                onApplyClick={openLogin}
            />
            
            <FeaturedCompanies companies={companies} loading={loading} onEnquire={setEnquiryCompany} />
            <UnlistedBenefits />
            <InvestmentProcess />
            
            <div className="bg-white px-2">
                <div className="max-w-[1440px] mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Unlisted shares are subject to market risks. Prices and availability are indicative. Please consult with a financial advisor before investing.
                    </p>
                </div>
            </div>

            <FAQSection />
            <UnlistedCTA />
            <ScrollToTop />

            {/* Enquiry Modal */}
            {enquiryCompany && (
                <div className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-8">
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-5 text-white flex justify-between items-center sticky top-0">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Enquire About {enquiryCompany.name}</h3>
                                <p className="text-sm text-white/80">Fill details to get started</p>
                            </div>
                            <button 
                                onClick={() => setEnquiryCompany(null)} 
                                className="hover:bg-white/20 p-2 rounded-full transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-[7000] bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Enquiry Sent!</h3>
                        <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                            Thank you for your interest! Our relationship manager will contact you within 24 hours.
                        </p>
                        <button 
                            onClick={() => setShowSuccess(false)} 
                            className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}