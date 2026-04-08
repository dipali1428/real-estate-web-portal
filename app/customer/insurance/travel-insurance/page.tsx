'use client';

import TravelInsuranceSection from '../../../products/travel-insurance/components/TravelInsuranceSection ';

export default function TravelInsuranceDashboard() {
    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen">
            <TravelInsuranceSection isDashboard={true} />
        </div>
    );
}
