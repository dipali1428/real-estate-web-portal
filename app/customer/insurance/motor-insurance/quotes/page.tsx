import React from 'react';


import InsurancePlanComparison from '../../../../products/motor-insurance/components/InsurancePlanComparison';

const MotorQuotes: React.FC = () => {
   return (
      <div className="space-y-10">
         {/* Official Plan Comparison Component */}
         <div>
            <InsurancePlanComparison
               showVehicleSelection={true}
               viewDetailsText="Download Quote"
            />
         </div>

      </div>
   );
};

export default MotorQuotes;
