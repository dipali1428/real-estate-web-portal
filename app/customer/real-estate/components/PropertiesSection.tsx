'use client';

// import React from 'react';
import BasePropertiesSection from '@/app/products/RealEstate/components/PropertiesSection';

interface CustomerPropertiesSectionProps {
    onPropertySelect?: (id: string) => void;
}

/**
 * CustomerPropertiesSection
 * 
 * A specialized wrapper for the Real Estate properties section tailored for the customer dashboard.
 * It automatically filters for 'live' properties and hides public marketing content.
 * 
 * Any changes made to the master property data in app/products/RealEstate/data/properties.ts
 * will automatically reflect here.
 */
const CustomerPropertiesSection = ({ onPropertySelect }: CustomerPropertiesSectionProps) => {
    return (
        <div className="customer-properties-wrapper">
            <BasePropertiesSection 
                onPropertySelect={onPropertySelect} 
                showOnlyLive={true} 
            />
        </div>
    );
};

export default CustomerPropertiesSection;
