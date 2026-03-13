'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from "../../context/ModalContext"; 
import { Loader2, CheckCircle, X, User, Mail, Phone, Package } from 'lucide-react';
import { fetchAllShares, createEnquiry } from '../../services/unlistedservices';

// Components
import UnlistedHero from './components/UnlistedHero';
import FeaturedCompanies from './components/FeaturedCompanies';
import InvestmentProcess from './components/InvestmentProcess';
import UnlistedBenefits from './components/UnlistedBenefits';
import FAQSection from './components/UnlistedFAQ';
import UnlistedCTA from './components/UnlistedCTA';
import ScrollToTop from '../../component/ScrollToTop';

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
    const { openPartner, openLogin } = useModal(); // Also get openLogin from context
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [enquiryCompany, setEnquiryCompany] = useState<Company | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [enquiryError, setEnquiryError] = useState<string | null>(null);
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', quantity: '', message: '' });

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetchAllShares();
                const data = Array.isArray(res) ? res : res?.data || res?.shares || [];
                setCompanies(data);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        loadData();
    }, []);

    const handleEnquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone.length !== 10) return setEnquiryError('Enter 10-digit mobile number');
        setIsSubmitting(true);
        try {
            await createEnquiry({
                company_id: enquiryCompany!.id,
                company_name: enquiryCompany!.name,
                enquiry_type: 'buy',
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                quantity: parseInt(formData.quantity),
                message: `Enquiry for ${enquiryCompany!.name}`
            });
            setShowSuccess(true);
            setEnquiryCompany(null);
            setFormData({ fullName: '', email: '', phone: '', quantity: '', message: '' });
        } catch { setEnquiryError('Failed to submit.'); } finally { setIsSubmitting(false); }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#b5d9f3] via-white to-[#ecf5ec] text-slate-800 font-sans scroll-smooth">
            {/* Pass both props - onActionClick and onApplyClick */}
            <UnlistedHero 
                onActionClick={openPartner} 
                onApplyClick={openLogin} // Pass openLogin for the Apply Now button
            />
            
            {/* Sections are now seamless without borders or block backgrounds */}
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

            {/* Modal Logic (Same as before) */}
            {enquiryCompany && (
                <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative">
                         <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white flex justify-between">
                            <h2 className="text-xl font-black">Enquire: {enquiryCompany.name}</h2>
                            <button onClick={() => setEnquiryCompany(null)}><X size={24} /></button>
                         </div>
                         <form onSubmit={handleEnquiry} className="p-8 space-y-4">
                            <input required placeholder="Name" className="w-full p-3 bg-gray-50 rounded-xl" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                            <input required placeholder="Email" className="w-full p-3 bg-gray-50 rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            <input required placeholder="Phone" className="w-full p-3 bg-gray-50 rounded-xl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            <input required type="number" className="w-full p-3 bg-gray-50 rounded-xl" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
                            <button className="w-full py-4 bg-[#2076C7] text-white font-bold rounded-xl">{isSubmitting ? 'Submitting...' : 'Enquire Now'}</button>
                         </form>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] p-10 text-center">
                        <CheckCircle size={60} className="text-emerald-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-black">Submitted Successfully</h2>
                        <button onClick={() => setShowSuccess(false)} className="mt-6 px-10 py-3 bg-[#2076C7] text-white rounded-xl font-bold">Close</button>
                    </div>
                </div>
            )}
        </main>
    );
}