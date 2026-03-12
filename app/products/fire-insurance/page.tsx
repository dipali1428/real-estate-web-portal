"use client";

import { useEffect, useState } from "react";
import FireHero from "./components/FireHero";
import InsurableProperties from "./components/InsurableProperties";
import CoverageGrid from "./components/CoverageGrid";
import FireCalculator from "./components/FireCalculator";
import FireBenefits from "./components/FireBenefits";
import FireFAQ from "./components/FireFAQ";
import FireAnalysis from "./components/FireAnalysis";
import FireProductGrid from "./components/FireProductGrid";
import FireInsuranceForm from "../../component/products/forms/insurance/fireinsuranceform";
import ScrollToTop from "@/app/component/ScrollToTop";
import ChatbotWidget from "@/app/component/chatbot/page";
import FireCTA from "./components/FireCTA";
import { useModal } from "../../context/ModalContext";
export default function FireInsurancePage() {
    const [mounted, setMounted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    const { openLogin } = useModal();

    if (!mounted) return null;

    const openForm = () => openLogin();
    const closeForm = () => setShowForm(false);

    return (
        <main className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <FireHero />

            {/* Premium Calculator */}
            <div id="calculator">
                <FireCalculator openForm={openForm} />
            </div>

            {/* Data Analysis Section - Moved up for alignment */}
            <FireAnalysis />

            {/* Product Categories Section */}
            <FireProductGrid />

            {/* Property Types Section */}
            <div id="insurable-properties">
                <InsurableProperties />
            </div>

            {/* Coverage Details */}
            <CoverageGrid />

            {/* Why Choose Us / Benefits */}
            <FireBenefits />

            {/* Frequently Asked Questions */}
            <FireFAQ />
            <FireCTA />

            {/* Application Form Modal */}
            {showForm && (
                <FireInsuranceForm onClose={closeForm} />
            )}
            <ScrollToTop />
            <ChatbotWidget />
        </main>
    );
}