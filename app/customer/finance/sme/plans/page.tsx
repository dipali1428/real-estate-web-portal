'use client';

import SMELoanTypesSection from '../components/SMELoanTypesSection';

export default function SMELoanPlansPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* SME Loan Products Section */}
            <SMELoanTypesSection showOnlyLive={true} />
            
            {/* Added a subtle footer disclaimer area as seen in other loan pages */}
            <div className="max-w-[1440px] mx-auto px-6 pb-12">
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-sm">
                    <p className="text-sm text-slate-500 text-center leading-relaxed font-medium">
                        <strong className="text-slate-800 font-black tracking-tight">Disclaimer:</strong>{" "}
                        Loan Approvals are subject to the policies, eligibility criteria, and discretion of the respective banks or financial institutions.
                    </p>
                </div>
            </div>
        </div>
    );
}
