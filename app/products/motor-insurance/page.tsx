"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Zap } from "lucide-react";
import Hero from "./components/Hero";
import MotorProductTypes from "./components/MotorProductTypes";
import PremiumCalculator from "./components/PremiumCalculator";
import CoverageInclusionsExclusions from "./components/CoverageInclusionsExclusions";
import DocumentsAndProcess from "./components/DocumentsAndProcess";
import GuideAndClaims from "./components/GuideAndClaims";
import PolicyComparison from "./components/PolicyComparison";
import InsurancePartners from "./components/InsurancePartners";
import InsurancePlanComparison from "./components/InsurancePlanComparison";
import FAQ from "./components/FAQ";
import CTASection from "@/app/component/CTASection";
import ScrollToTop from "@/app/component/ScrollToTop";
import { useModal } from "@/app/context/ModalContext";

export default function Home() {
    const [vehicleType, setVehicleType] = useState("car");
    const router = useRouter();
    const { openLogin } = useModal();

    const handleBackHome = () => router.push("/");

    return (
        <main className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
            {/* Fixed Back to Home Button */}
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
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>
            </div>

            {/* Fixed Apply Now Button */}
            <div className="fixed z-50 top-20 right-4 md:top-24 md:right-8">
                <button
                    onClick={openLogin}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-[15px] font-bold text-white bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                >
                    Apply Now
                    <Zap size={18} fill="currentColor" className="text-white" />
                </button>
            </div>

            <Hero />
            <MotorProductTypes />
            <InsurancePlanComparison
                activeVehicleType={vehicleType}
                setActiveVehicleType={setVehicleType}
            />
            <PremiumCalculator vehicleType={vehicleType} setVehicleType={setVehicleType} />

            <PolicyComparison />
            <CoverageInclusionsExclusions />
            <DocumentsAndProcess />
            <GuideAndClaims />
            <InsurancePartners />

            {/* Disclaimer Section */}
            <div className="bg-white py-6 md:py-8 px-4">
                <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Policy details such as premium rates, coverage, and eligibility are indicative and may change based on insurer policies, IRDAI guidelines, and vehicle profile. Please verify terms with the respective insurance provider before buying.
                    </p>
                </div>
            </div>

            <FAQ />
            <CTASection
                title="Ready to Protect Your Vehicle?"
                description="Get comprehensive coverage tailored for your vehicle today. Experience a seamless process with instant policy issuance and hassle-free claims."
                buttonText="Request a Callback"
                buttonLink="/#contact"
            />
            <ScrollToTop />
        </main>
    );
}
