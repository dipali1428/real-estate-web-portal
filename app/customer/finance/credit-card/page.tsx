'use client';

import { useState } from 'react';
import EnquiryModal from '@/app/customer/orderform/EnquiryModal';
import CardTypesSection from '@/app/products/credit-card/components/CardTypesSection';

export default function CustomerCreditCardPage() {
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [selectedCardTitle, setSelectedCardTitle] = useState('');

    const handleApplyClick = (title: string) => {
        setSelectedCardTitle(title);
        setIsEnquiryOpen(true);
    };

    return (
        <>
            <div className="flex-1 p-4 sm:p-6">
                <CardTypesSection
                    showOnlyLive={true}
                    isDashboard={true}
                    onApplyClick={handleApplyClick}
                />
            </div>
            <EnquiryModal
                isOpen={isEnquiryOpen}
                onClose={() => setIsEnquiryOpen(false)}
                productType="CREDIT_CARD"
                productName={selectedCardTitle}
                productId={0}
                sourcePage="/customer/finance/credit-card"
                preFillMessage={`I am interested in the ${selectedCardTitle} credit card. Please share more details and help me apply.`}
            />
        </>
    );
}
