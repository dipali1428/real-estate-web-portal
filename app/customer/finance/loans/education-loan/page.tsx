'use client';

import LoanTypesSection from '@/app/products/education-loan/components/LoanTypesSection';

export default function EducationLoanPlansPage() {
    return (
        <div className="flex-1 p-4 sm:p-6">
            <LoanTypesSection showOnlyLive={true} isDashboard={true} />
        </div>
    );
}