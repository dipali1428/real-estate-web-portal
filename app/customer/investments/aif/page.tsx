'use client';

import React from 'react';
import ExploreAIF from './components/ExploreAIF';

export default function AIFDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-50 via-white to-blue-50">
            <div className="p-4 sm:p-6 lg:p-8">

                {/* Interactive Explore Section */}
                <ExploreAIF />

                {/* Disclaimer Section */}
                <div className="mt-12 p-6 bg-teal-50 rounded-3xl border border-teal-100">
                    <p className="text-xs text-teal-800 leading-relaxed text-center italic">
                        <strong>Disclaimer:</strong> Alternative Investment Funds (AIF) are high-risk investments suitable only for sophisticated investors. Minimum investment required is ₹1 Crore as per SEBI regulations. Registration and detailed documentation (PPM) are mandatory before making any investment decision.
                    </p>
                </div>
            </div>
        </div>
    );
}
