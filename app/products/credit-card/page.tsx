'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import CardTypesSection from './components/CardTypesSection';
import FAQSection from './components/FAQSection';
import EligibilityAndProcess from './components/EligibilityAndProcess';
import BenefitsSection from './components/BenefitsSection';
import CTASection from '../../component/CTASection';
import ScrollToTop from '@/app/component/ScrollToTop';
import ContactModal from '../../component/ContactModal';
import { useState } from 'react';

export default function CreditCardPage() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [modalSource, setModalSource] = useState("Credit Card Page (Callback Request)");

    const openContactModal = (source: string) => {
        setModalSource(source);
        setIsContactModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-white">
            <HeroSection onApplyClick={() => openContactModal("Credit Card Page (Hero Apply)")} />
            
            <div id="types">
                <CardTypesSection 
                    onApplyClick={(title) => openContactModal(`Credit Card Page (Apply Now: ${title})`)} 
                    onContactClick={() => openContactModal("Credit Card Page (Sidebar Callback)")} 
                />
            </div>
            <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-16">
                <div className="bg-[#1CADA3] rounded-[2rem] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_40px_-15px_rgba(28,173,163,0.3)] relative overflow-hidden group">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full translate-x-1/3 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2076C7]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                        {/* Abstract Cibil meter icon replacement */}
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
                            <svg className="w-8 h-8 text-[#2076C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20v-4" />
                                <path d="M12 12v-2" />
                                <path d="M16 20v-8" />
                                <path d="M16 8v-2" />
                                <path d="M8 20v-4" />
                                <path d="M4 20v-1" />
                                <path d="M20 20v-10" />
                                <path d="M2 20h20" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight drop-shadow-sm">
                                Check Your CIBIL Credit Score Now
                            </h3>
                            <p className="text-white/90 font-bold text-sm md:text-base tracking-wide uppercase">
                                Absolutely FREE!!
                            </p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => window.location.href = '/page/cibil'}
                        className="relative z-10 shrink-0 bg-white text-[#2076C7] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 cursor-pointer"
                    >
                        Check Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <EligibilityAndProcess />

            <div id="benefits">
                <BenefitsSection />
            </div>

            <div id="faq">
                <div className="max-w-[1440px] mx-auto px-6 -mb-8 lg:-mb-12 relative z-10">
                    <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 shadow-sm">
                        <p className="text-sm text-slate-600 text-center leading-relaxed font-medium">
                            <strong className="text-slate-900 font-black uppercase tracking-wider text-xs mr-2">Disclaimer:</strong> Credit card details such as reward rates, fees, and eligibility are indicative and may change based on bank policies, RBI guidelines, and applicant profile. Please verify terms with the respective bank or card issuer before applying.
                        </p>
                    </div>
                </div>
                <FAQSection />
            </div>

             <div id="cta">
                <CTASection onClick={() => openContactModal("Credit Card Page (Footer CTA)")} />
            </div>
            <div id="Srolltotop">
                <ScrollToTop />
            </div>

          <ContactModal 
                isOpen={isContactModalOpen} 
                onClose={() => setIsContactModalOpen(false)} 
                source={modalSource}
            /> 
        </main>
    );
}
