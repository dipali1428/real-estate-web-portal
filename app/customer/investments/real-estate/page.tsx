'use client';

import React, { useState, Suspense } from 'react';
import CustomerPropertiesSection from './components/PropertiesSection';
import RealEstatePropertyDetailsModal from '../../../products/RealEstate/components/PropertyDetailsModal';
import Login from '@/app/auth/login/page';
import { useModal } from '@/app/context/ModalContext';

export default function RealEstateDashboard() {
    const { openApplyNow } = useModal();
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handlePropertySelect = (id: string) => {
        setSelectedPropertyId(id);
    };

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            <Suspense fallback={<div className="py-20 text-center text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Synchronizing Market Data...</div>}>
                <CustomerPropertiesSection 
                    onPropertySelect={handlePropertySelect} 
                    isDashboard={true}
                />
            </Suspense>

            {/* Modals */}
            {selectedPropertyId && (
                <RealEstatePropertyDetailsModal
                    propertyId={selectedPropertyId}
                    onClose={() => setSelectedPropertyId(null)}
                    onInvestNow={(propertyTitle) => {
                        setSelectedPropertyId(null);
                        openApplyNow(propertyTitle, true);
                    }}
                />
            )}

            <Login 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
            />
        </div>
    );
}