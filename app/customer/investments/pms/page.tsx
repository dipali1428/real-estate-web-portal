'use client';

import React from 'react';
import ExplorePMS from './components/ExplorePMS';

export default function PMSDashboard() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="p-4 sm:p-6">
                {/* Interactive Explore Section slice */}
                <ExplorePMS />

                {/* Disclaimer Section */}
                <div className="mt-12 p-6 bg-amber-50 rounded-3xl border border-amber-100">
                    <p className="text-xs text-amber-800 leading-relaxed text-center italic">
                        <strong>Disclaimer:</strong> Portfolio Management Services (PMS) involve investment risks. Past performance is not indicative of future results. Minimum investment required is ₹50 Lakhs as per SEBI regulations. Please read the disclosure documents carefully before investing.
                    </p>
                </div>
            </div>
        </div>
    );
}
