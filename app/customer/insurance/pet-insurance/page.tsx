'use client';

import React from 'react';


import PetInsuranceSection from './components/PetInsuranceSection';

export default function PetInsuranceDashboard() {
    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            <PetInsuranceSection isDashboard={true} />
        </div>
    );
}
