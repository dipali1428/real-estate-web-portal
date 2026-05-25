"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import InsurancePlanComparison from '../../../../products/motor-insurance/components/InsurancePlanComparison';

const MotorQuotes: React.FC = () => {
   const router = useRouter();

   const handleViewDetails = (company: any, vehicleType: string, planType: string, cc: string, idv: number) => {
      if (!company?.id) return;
      router.push(`/customer/insurance/motor-insurance/quotes/${company.id}?vehicleType=${vehicleType}&planType=${planType}&cc=${cc}&idv=${idv}`);
   };

   return (
      <div className="space-y-10">
         {/* Official Plan Comparison Component */}
         <div>
            <InsurancePlanComparison
               showVehicleSelection={true}
               onViewDetails={handleViewDetails}
            />
         </div>
      </div>
   );
};

export default MotorQuotes;
