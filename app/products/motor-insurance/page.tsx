"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import PremiumCalculator from "./components/PremiumCalculator";
import ClaimsProcess from "./components/ClaimsProcess";
import Documents from "./components/Documents";
import FAQ from "./components/FAQ";
import CoverageInclusionsExclusions from "./components/CoverageInclusionsExclusions";
import BuyingGuide from "./components/BuyingGuide";
import BuyingProcess from "./components/BuyingProcess";
import PolicyComparison from "./components/PolicyComparison";
import InsurancePartners from "./components/InsurancePartners";
import InsurancePlanComparison from "./components/InsurancePlanComparison";
import MotorProductTypes from "./components/MotorProductTypes";


export default function Home() {
    const [vehicleType, setVehicleType] = useState("car");

    return (
        <main className="min-h-screen bg-gray-50 overflow-x-hidden">
            <Hero />
            <MotorProductTypes />
            <InsurancePlanComparison
                activeVehicleType={vehicleType}
                setActiveVehicleType={setVehicleType}
            />
            <PremiumCalculator vehicleType={vehicleType} setVehicleType={setVehicleType} />

            <PolicyComparison />
            <Documents />
            <CoverageInclusionsExclusions />
            <BuyingProcess />
            <BuyingGuide />
            <ClaimsProcess />
            <InsurancePartners />
            <FAQ />
        </main>
    );
}
