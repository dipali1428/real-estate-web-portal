'use client';

import CardTypesSection from '@/app/products/credit-card/components/CardTypesSection';

export default function CustomerCreditCardPage() {
    return (
           <div className="flex-1 p-4 sm:p-6">
            <CardTypesSection showOnlyLive={true} isDashboard={true} />
        </div>
    );
}
