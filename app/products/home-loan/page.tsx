"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense, useMemo } from 'react';
import { ArrowLeft as IconArrowLeft, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Data & Services
import { homeLoanData as offer } from './data';
import { categorizedPlans, PARTNER_BANKS } from './loanConstants';
import { AuthService } from "@/app/services/authService";
import { useModal } from '@/app/context/ModalContext';

// Components
import HeroSection from './components/HeroSection';
import LoanTypesSection from './components/LoanTypesSection';
import PartnerBanksSection from './components/PartnerBanksSection';
import LoanVariantsTable from './components/LoanVariantsTable';
import LoanComparisonTable from './components/LoanComparisonTable';
import EligibilitySection from './components/EligibilitySection';
import ProcessOverviewSection from './components/ProcessOverviewSection';
import HomeLoanFAQ from './components/HomeLoanFAQ';
import VerificationPopup from './components/VerificationPopup';
import HomeLoanForm from './components/HomeLoanForm';
import LoanCalculator from './components/LoanCalculator';
import CTASection from '@/app/component/CTASection';
import ScrollToTop from '@/app/component/ScrollToTop';
import Chatbot from '@/app/component/chatbot/page';

export default function HomeLoanPage() {
    const router = useRouter();
    const { openSignup } = useModal();
    const [isVerifying, setIsVerifying] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [verifiedUserData, setVerifiedUserData] = useState({ name: "", email: "", mobile: "" });
    const [activeCategory, setActiveCategory] = useState('New Purchase');
    const [showBackButton, setShowBackButton] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => setShowBackButton(window.scrollY < 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // SEO
    useEffect(() => {
        const title = `${offer.title} - ${offer.category} | Financial Services`;
        document.title = title;
        const description = offer.description || `Explore ${offer.title} - ${offer.overview?.substring(0, 150)}...`;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            metaDescription.setAttribute('content', description);
            document.head.appendChild(metaDescription);
        }
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: offer.title, description, provider: { '@type': 'Organization', name: 'Financial Services' }, serviceType: offer.category });
        document.head.appendChild(script);
        return () => { if (script.parentNode === document.head) document.head.removeChild(script); };
    }, [offer]);

    const filteredPartners = useMemo(() => {
        const currentPlans = categorizedPlans[activeCategory] || [];
        const bankNamesInCategory = new Set(currentPlans.map((p: any) => p.bank.toLowerCase()));
        return PARTNER_BANKS.filter((partner: any) => {
            const partnerName = partner.name.toLowerCase();
            return Array.from(bankNamesInCategory).some((planBank: any) =>
                partnerName.includes(planBank) || planBank.includes(partnerName)
            );
        });
    }, [activeCategory]);

    const handleBackHome = () => router.push('/');
    const handleApply = () => openSignup();
    const handleVerificationSuccess = (userData: { name: string; email: string; mobile: string }) => {
        setVerifiedUserData(userData);
        setIsVerifying(false);
        setIsFormOpen(true);
    };

    const breadcrumbStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yourdomain.com' },
            { '@type': 'ListItem', position: 2, name: 'Offers', item: 'https://yourdomain.com/offers' },
            { '@type': 'ListItem', position: 3, name: offer.title, item: `https://yourdomain.com/offers/loans/home-loan` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

            <div className="min-h-screen bg-neutral-100 font-sans">

                {/* Fixed Back Button */}
                <div className={`fixed z-50 top-20 left-4 md:top-24 md:left-8 transition-all duration-300 ${showBackButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <button onClick={handleBackHome} aria-label="Back to Home" className="md:hidden group flex items-center gap-2 p-2 text-gray-500">
                        <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                            <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                        </div>
                    </button>
                    <button onClick={handleBackHome} className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group">
                        <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                        Back to Home
                    </button>
                </div>

                {/* Hero */}
                <HeroSection onApply={handleApply} isMobile={isMobile} />

                <main>
                    {/* Loan Types */}
                    <LoanTypesSection onApply={handleApply} />

                    {/* Section Divider */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-0.5 bg-linear-to-r from-transparent to-transparent opacity-40 rounded-full" />
                    </div>

                    {/* Partner Banks */}
                    <PartnerBanksSection
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        filteredPartners={filteredPartners}
                    />

                    {/* EMI Calculator */}
                    <section className="py-12 md:py-16 bg-white border-y border-gray-100">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                                <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                    Calculate Your EMI
                                </motion.h2>
                                <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                    Plan your home purchase with our accurate EMI calculator.
                                </motion.p>
                            </motion.div>
                            <div className="mb-12">
                                <Suspense fallback={<div className="flex justify-center items-center py-12">Loading calculator...</div>}>
                                    <LoanCalculator />
                                </Suspense>
                            </div>
                        </div>
                    </section>

                    {/* Loan Variants Table */}
                    <LoanVariantsTable />

                    {/* Comparison Table */}
                    <LoanComparisonTable />

                    {/* Eligibility */}
                    <EligibilitySection eligibility={offer.eligibility} />

                    {/* Process Overview */}
                    <ProcessOverviewSection />

                    {/* Section Divider */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-0.5 bg-linear-to-r from-transparent to-transparent opacity-40 rounded-full" />
                    </div>

                    {/* FAQ */}
                    <HomeLoanFAQ />

                    {/* CTA */}
                    <CTASection />
                </main>

                {/* Verification Modal */}
                {isVerifying && (
                    <VerificationPopup
                        offerTitle={offer.title}
                        onSuccess={handleVerificationSuccess}
                        onCancel={() => setIsVerifying(false)}
                    />
                )}

                {/* Product Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl p-6">
                            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <Suspense fallback={<div className="flex justify-center items-center py-12">Loading form...</div>}>
                                <HomeLoanForm onClose={() => setIsFormOpen(false)} prefilledData={verifiedUserData} />
                            </Suspense>
                        </div>
                    </div>
                )}

                <Chatbot />
            </div>
            <ScrollToTop />
        </>
    );
}
