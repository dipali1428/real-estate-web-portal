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

export default function FireInsurancePage() {
    const [mounted, setMounted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    if (!mounted) return null;

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <FireHero />

            {/* Premium Calculator - Moved up for alignment */}
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

            {/* Application Form Modal */}
            {showForm && (
                <FireInsuranceForm onClose={closeForm} />
            )}
        </main>
    );
}
